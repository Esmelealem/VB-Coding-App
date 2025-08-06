// stores/editorStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FileType = {
  id: string;
  name: string;
  language: string;
  content: string;
  path: string;
  indentation: 'spaces' | 'tab';
  indentSize: number;
  lastModified: Date;
};

type EditorState = {
  files: FileType[];
  activeFileId: string | null;
  cursorPosition: {
    line: number;
    column: number;
  };
  recentFiles: string[];
    isDirty: boolean;
    getActiveFile: () => FileType | null;
};

type EditorActions = {
  openFile: (file: FileType) => void;
  closeFile: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  setCursorPosition: (line: number, column: number) => void;
  changeIndentation: (type: 'spaces' | 'tab', size?: number) => void;
  saveCurrentFile: () => void;
  addRecentFile: (path: string) => void;
  clearRecentFiles: () => void;
};

const initialState: EditorState = {
    files: [],
    activeFileId: null,
    cursorPosition: { line: 1, column: 1 },
    recentFiles: [],
    isDirty: false,
    getActiveFile: function (): FileType | null {
        throw new Error('Function not implemented.');
    }
};

export const useEditorStore = create<EditorState & EditorActions>()(
  persist(
    (set, get) => ({
          ...initialState,
        getActiveFile: () => {
        const { files, activeFileId } = get();
        return files.find(f => f.id === activeFileId) || null;
      },

      openFile: (file) => {
        const { files, addRecentFile } = get();
        
        // If file already open, just activate it
        const existingFile = files.find(f => f.path === file.path);
        if (existingFile) {
          set({ activeFileId: existingFile.id });
          addRecentFile(file.path);
          return;
        }

        // Add new file
        set((state) => ({
          files: [...state.files, file],
          activeFileId: file.id,
          isDirty: false,
        }));
        
        addRecentFile(file.path);
      },

      closeFile: (id) => {
        set((state) => {
          const remainingFiles = state.files.filter(f => f.id !== id);
          let newActiveId = state.activeFileId;

          // If closing the active file, activate another one
          if (state.activeFileId === id) {
            newActiveId = remainingFiles.length > 0 
              ? remainingFiles[remainingFiles.length - 1].id 
              : null;
          }

          return {
            files: remainingFiles,
            activeFileId: newActiveId,
            isDirty: false,
          };
        });
      },

      updateFileContent: (id, content) => {
        set((state) => ({
          files: state.files.map(file => 
            file.id === id ? { ...file, content, lastModified: new Date() } : file
          ),
          isDirty: true,
        }));
      },

      setCursorPosition: (line, column) => {
        set({ cursorPosition: { line, column } });
      },

      changeIndentation: (type, size = 2) => {
        set((state) => ({
          files: state.files.map(file => 
            file.id === state.activeFileId 
              ? { ...file, indentation: type, indentSize: type === 'spaces' ? size : 0 }
              : file
          ),
        }));
      },

      saveCurrentFile: () => {
        set({ isDirty: false });
        // Here you would typically add API call to save to backend
      },

      addRecentFile: (path) => {
        set((state) => {
          const updatedRecents = [
            path,
            ...state.recentFiles.filter(p => p !== path).slice(0, 9)
          ];
          return { recentFiles: updatedRecents };
        });
      },

      clearRecentFiles: () => {
        set({ recentFiles: [] });
      },
    }),
    {
      name: 'editor-storage',
      partialize: (state) => ({ 
        files: state.files,
        recentFiles: state.recentFiles,
      }),
    }
  )
);
// Selectors for optimized re-renders
export const useActiveFile = () => 
  useEditorStore(state => 
    state.files.find(f => f.id === state.activeFileId) || null
  );

export const useFileContent = (id: string) =>
  useEditorStore(state => 
    state.files.find(f => f.id === id)?.content || ''
  );