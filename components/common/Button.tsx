import { RefObject } from "react";

interface ButtonProps {
    content: string | React.ReactNode;
    description?: string | React.ReactNode;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    backgroundColor?: string;
    hoverColor?: string;
    textColor?: string;
    textHoverColor?: string;
    activeColor?: string;
    className?: string;
    classNameContent?: string;
    disabled?: boolean;
    disabledColor?: string;
    onClick?: () => void;
    ref?: RefObject<HTMLButtonElement | null>;
}

const Button = (props: ButtonProps) => {
    return (
        <button className={`
            ${props.disabled && (props.disabledColor ?? 'bg-neutral-700')}
            ${props.disabled && 'cursor-default'}
            ${!props.disabled && (props.backgroundColor ?? 'bg-neutral-600')}
            ${!props.disabled && (props.hoverColor ?? 'hover:bg-neutral-500/50')}
            ${!props.disabled && (props.textColor ?? 'text-neutral-100')}
            ${!props.disabled && (props.textHoverColor ?? props.textColor ?? 'text-neutral-100')}
            ${!props.disabled && (props.activeColor ?? 'active:bg-neutral-700')}
            flex 
            gap-1 
            items-center 
            text-sm 
            px-4
            py-2
            justify-center 
            rounded-md 
            shadow-md 
            transition-all
            select-none
            group
            ${props.className}
        `} onClick={props.disabled ? () => {} : props.onClick} ref={props.ref}>
            {props.leftContent}
            {((props.content !== undefined && props.content !== null) || props.description) && (
                <div className={`flex flex-col items-start ${props.classNameContent}`}>
                    <div>{props.content}</div>
                    <div className="text-sm text-neutral-500">{props.description}</div>
                </div>
            )}
            {props.rightContent}
        </button>
    )
}

export default Button;