import { Eye, EyeClosed, Bold, Italic, List, ListOrdered, Link as LinkIcon, Quote, Heading1, Heading2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';

interface TextInputFieldProps {
  id: string;
  name?: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name?: string; value: string } }) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  touched?: boolean;
  type?: "text" | "password" | "email" | "number" | "date" | "textarea";
  variant?: "default" | "rich-text";
  iconStart?: React.ReactNode;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  // React Hook Form compatibility
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
  helperText?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      icon: <Heading1 className="w-4 h-4" />,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Bold className="w-4 h-4" />,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <Italic className="w-4 h-4" />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <List className="w-4 h-4" />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: <Quote className="w-4 h-4" />,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      icon: <LinkIcon className="w-4 h-4" />,
      title: "Link",
      action: () => {
        const url = window.prompt("URL");
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      isActive: editor.isActive("link"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
      {buttons.map((btn, i) => (
        <button
          key={i}
          type="button"
          onClick={btn.action}
          className={`p-1.5 rounded-lg hover:bg-gray-200 transition-colors ${btn.isActive ? "bg-gray-200 text-gray-900" : "text-gray-500"
            }`}
          title={btn.title}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

const RichTextEditorInternal = ({
  value,
  onChange,
  disabled,
  placeholder,
  name,
  isInvalid,
}: {
  value: string;
  onChange?: (e: any) => void;
  disabled: boolean;
  placeholder?: string;
  name?: string;
  isInvalid: boolean;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || "Type something...",
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange({
          target: {
            name,
            value: html === "<p></p>" ? "" : html,
          },
        } as any);
      }
    },
    editable: !disabled,
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[200px] h-full cursor-text',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div
      className={`flex flex-col h-full ${disabled ? "bg-gray-100 opacity-60 cursor-not-allowed" : "bg-white"
        }`}
      onClick={() => editor?.chain().focus().run()}
    >
      <MenuBar editor={editor} />
      <div
        className={`prose prose-sm max-w-none p-4 min-h-[200px] focus-within:outline-none 
          ${isInvalid ? "bg-red-50/50" : ""}
        `}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

const TextInputField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextInputFieldProps
>(
  (
    {
      id,
      name,
      label,
      placeholder,
      value,
      onChange,
      onBlur,
      touched,
      type = "text",
      variant = "default",
      iconStart,
      required = false,
      error,
      disabled = false,
      onKeyDown,
      rows = 4,
      helperText,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputValue = value ?? "";
    const isInvalid =
      (touched && required && !inputValue.trim()) ||
      (error && error.length > 0);

    const isRichText = variant === "rich-text";
    const isTextarea = type === "textarea";
    const isPassword = type === "password";
    const currentType = isPassword && showPassword ? "text" : type;

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className={`block text-xs mb-2 font-bold capitalize tracking-wider ${disabled ? "text-gray-400" : "text-gray-900"
            }`}
        >
          {label}
        </label>
        <div
          className={`relative ${isRichText ? "rounded-xl border border-gray-200 overflow-hidden" : ""
            }`}
        >
          {isRichText ? (
            <RichTextEditorInternal
              value={inputValue}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              name={name}
              isInvalid={isInvalid}
            />
          ) : (
            <>
              {iconStart && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {iconStart}
                </div>
              )}

              {isTextarea ? (
                <textarea
                  ref={ref as React.Ref<HTMLTextAreaElement>}
                  required={required}
                  id={id}
                  name={name}
                  rows={rows}
                  className={`w-full p-3.5 border rounded-xl transition-all duration-200 placeholder:text-gray-400 placeholder:text-xs
                  ${isInvalid
                      ? "border-red-200 bg-red-50/50 focus:ring-red-100 focus:border-red-300"
                      : "border-gray-200 bg-gray-50/30 focus:bg-white focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                    }
                  ${iconStart ? "pl-11" : ""} 
                  ${disabled
                      ? "bg-gray-100/50 text-gray-400 border-gray-100 cursor-not-allowed focus:ring-0"
                      : ""
                    }`}
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={onChange as any}
                  onBlur={onBlur as any}
                  onKeyDown={onKeyDown as any}
                  disabled={disabled}
                />
              ) : (
                <input
                  ref={ref as React.Ref<HTMLInputElement>}
                  required={required}
                  type={currentType ?? "text"}
                  id={id}
                  name={name}
                  className={`w-full p-3.5 border rounded-xl transition-all duration-200 placeholder:text-gray-400 placeholder:text-xs
                  ${isInvalid
                      ? "border-red-200 bg-red-50/50 focus:ring-red-100 focus:border-red-300"
                      : "border-gray-200 bg-gray-50/30 focus:bg-white focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                    }
                  ${iconStart ? "pl-11" : ""} 
                  ${isPassword ? "pr-11" : ""}
                  ${disabled
                      ? "bg-gray-100/50 text-gray-400 border-gray-100 cursor-not-allowed focus:ring-0"
                      : ""
                    }`}
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={onChange as any}
                  onBlur={onBlur as any}
                  onKeyDown={onKeyDown as any}
                  disabled={disabled}
                />
              )}

              {isPassword && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${disabled ? "text-gray-300 cursor-not-allowed" : "text-gray-400"
                    }`}
                  tabIndex={-1}
                  disabled={disabled}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              )}
            </>
          )}
        </div>

        {error && error.length > 0 ? (
          <p className="text-[11px] font-medium text-red-600 mt-1.5 ml-1">{error}</p>
        ) : (
          isInvalid ? (
            <p className="text-[11px] font-medium text-red-600 mt-1.5 ml-1">This field is required</p>
          ) : (
            helperText && <p className="text-[11px] text-gray-400 mt-1.5 ml-1">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

TextInputField.displayName = "TextInputField";

export default TextInputField;
