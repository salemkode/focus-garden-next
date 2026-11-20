const { withAppBuildGradle } = require('expo/config-plugins');

const MARK = '// focus-garden: release signing';

/**
 * Signs Android release builds with the Focus Garden release key instead of the shared debug key
 * that every React Native template ships. The key never enters the repository: its location and
 * passwords come from Gradle properties, normally ~/.gradle/gradle.properties on the release Mac:
 *
 *   FOCUS_GARDEN_RELEASE_STORE_FILE=/absolute/path/android-release.keystore
 *   FOCUS_GARDEN_RELEASE_STORE_PASSWORD=...
 *   FOCUS_GARDEN_RELEASE_KEY_ALIAS=focus-garden
 *   FOCUS_GARDEN_RELEASE_KEY_PASSWORD=...
 *
 * Without those properties a release build falls back to the debug key, so local release
 * builds keep working; scripts/android-release.sh refuses to publish such a build.
 */
function withReleaseSigning(contents) {
  if (contents.includes(MARK)) return contents;
  const release = `        release {
            ${MARK}
            if (project.hasProperty('FOCUS_GARDEN_RELEASE_STORE_FILE')) {
                storeFile file(FOCUS_GARDEN_RELEASE_STORE_FILE)
                storePassword FOCUS_GARDEN_RELEASE_STORE_PASSWORD
                keyAlias FOCUS_GARDEN_RELEASE_KEY_ALIAS
                keyPassword FOCUS_GARDEN_RELEASE_KEY_PASSWORD
            }
        }
`;
  // Add the release config next to the template's debug one.
  let next = contents.replace(/(signingConfigs\s*\{\s*\n)/, `$1${release}`);
  // In buildTypes.release, use it when the key is configured.
  next = next.replace(
    /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig signingConfigs\.debug/,
    "$1signingConfig project.hasProperty('FOCUS_GARDEN_RELEASE_STORE_FILE') ? signingConfigs.release : signingConfigs.debug",
  );
  if (!next.includes(MARK) || !next.includes('? signingConfigs.release')) {
    throw new Error('withReleaseSigning: android/app/build.gradle no longer matches the expected template.');
  }
  return next;
}

module.exports = (config) =>
  withAppBuildGradle(config, (mod) => {
    mod.modResults.contents = withReleaseSigning(mod.modResults.contents);
    return mod;
  });
module.exports.withReleaseSigning = withReleaseSigning;
