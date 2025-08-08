'use client'

import { ChangeEvent, RefObject, useRef, KeyboardEvent, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Button from "./Button";

interface InputProps {
    id: string;
    label?: string;
    placeholder?: string;
    description?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    className?: string;
    classNameLabel?: string;
    classNameDescription?: string;
    classNameInput?: string;
    classNameInner?: string;
    multiline?: boolean;
    resize?: boolean;
    type?: 'text' | 'password' | 'email';
    inputRef?: RefObject<HTMLInputElement | null>;
    textareaRef?: RefObject<HTMLTextAreaElement | null>;
    value?: string | number;
    error?: {
        errorState: boolean;
        errorDescription: string | undefined;
    };
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

const Input = (props: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [inputType, setInputType] = useState(props.type ?? 'text');
    
    const focusInput = () => {
        if (props.inputRef) {
            props.inputRef.current?.focus();
        } else {
            inputRef.current?.focus();
        }

        if (props.textareaRef) {
            props.textareaRef.current?.focus();
        } else {
            textareaRef.current?.focus();
        }
    };

    return (
        <div className={`flex w-full flex-col gap-0.5 ${props.className}`}>
            {props.label && <label htmlFor={props.id} className={`text-xs text-neutral-400 ${props.classNameLabel}`}>{props.label}</label>}
            <div className={`bg-neutral-800 items-center flex rounded-md py-2.5 w-full px-3 text-sm gap-2 ${!props.disabled ? 'focus-within:border-neutral-600 focus-within:border text-neutral-100' : 'text-neutral-400'} ${props.error?.errorState && 'border border-red-600'} ${props.classNameInner}`} onClick={focusInput}>
                {props.multiline ? (
                    <>
                        <textarea 
                            id={props.id} 
                            placeholder={props.placeholder}
                            value={props.value}
                            onChange={props.onChange} ref={props.textareaRef || textareaRef}
                            readOnly={props.readOnly || props.disabled}
                            className={`
                                bg-transparent 
                                outline-none 
                                h-full 
                                w-full 
                                ${props.classNameInput}
                                ${props.resize ? 'resize' : 'resize-none'}
                        `}></textarea>
                    </>
                ): (
                    <>
                        {props.leftContent}
                        <input 
                            id={props.id} 
                            ref={props.inputRef || inputRef}
                            placeholder={props.placeholder} 
                            type={inputType} 
                            value={props.value}
                            onChange={props.onChange}
                            onKeyDown={props.onKeyDown}
                            onFocus={props.onFocus} 
                            onBlur={props.onBlur}
                            readOnly={props.readOnly || props.disabled}
                            className={`
                                bg-transparent 
                                outline-none 
                                h-full 
                                w-full
                                ${props.classNameInput}
                            `}/>
                        {!props.rightContent ? (
                            props.type === 'password' && (
                                inputType === 'password' ? 
                                    <Button content={<LuEye />} backgroundColor="bg-transparent" hoverColor="bg-transparent" activeColor="bg-transaprent" className="!px-2 !py-0" onClick={() => setInputType('text')} /> : 
                                    <Button content={<LuEyeClosed />} backgroundColor="bg-transparent" hoverColor="bg-transparent" activeColor="bg-transaprent" className="!px-2 !py-0" onClick={() => setInputType('password')} />
                            )
                        ) : props.rightContent }
                    </>
                )}
            </div>
            {props.description && <p className={`text-xs text-neutral-400 mt-0.5 mx-0.5 ${props.classNameDescription}`}>{props.description}</p>}
            {props.error?.errorState && props.error?.errorDescription && <p className={`text-xs text-red-400 mt-0.5 mx-0.5 ${props.classNameDescription}`}>{props.error.errorDescription}</p>}
        </div>
    )
}

export default Input;