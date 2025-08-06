// import Editor from '@monaco-editor/react';
import  Editor from '@monaco-editor/react';
import { useVibeStore } from '../stores/vibeStore';

export function MyEditorComponent() {
  const { code, setCode, theme } = useVibeStore();
  
  const editorTheme = {
    dark: 'vs-dark',
    light: 'light',
    terminal: 'hc-black'
  }[theme];

  return (
    <Editor
      height="90vh"
      theme={editorTheme}
      language="javascript"
      value={code}
      onChange={(value) => setCode(value || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on'
      }}
    />
  );
}