import { Alert, type AlertButton } from 'react-native';

/**
 * Web: react-native-web's Alert.alert does nothing, so every confirmation (Join, Tip, Send, Merge,
 * Give up) silently failed in the browser. This shows the browser's own dialog instead: one action
 * plus Cancel becomes a confirm(), several actions become a numbered prompt().
 */
Alert.alert = (title: string, message?: string, buttons?: AlertButton[]) => {
  const text = [title, message].filter(Boolean).join('\n\n');
  const cancel = buttons?.find((button) => button.style === 'cancel');
  const actions = (buttons ?? []).filter((button) => button !== cancel);
  if (actions.length === 0) {
    window.alert(text);
    cancel?.onPress?.();
    return;
  }
  if (actions.length === 1) {
    if (window.confirm(`${text}\n\nOK: ${actions[0].text ?? 'OK'}`)) actions[0].onPress?.();
    else cancel?.onPress?.();
    return;
  }
  const choice = window.prompt(`${text}\n\n${actions.map((button, index) => `${index + 1}. ${button.text}`).join('\n')}\n\nType a number, or cancel.`);
  const picked = choice ? actions[Number(choice.trim()) - 1] : undefined;
  if (picked) picked.onPress?.();
  else cancel?.onPress?.();
};
