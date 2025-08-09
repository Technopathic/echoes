import * as NextLink from "next/link";

interface LinkProps {
    content: string | React.ReactNode;
    description?: string | React.ReactNode;
    href: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
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
}

const Link = (props: LinkProps) => {
    return (
        <NextLink.default href={props.href} target={props.target ?? '_self'} className={`
            ${props.disabled && (props.disabledColor ?? 'bg-neutral-700')}
            ${props.disabled && 'cursor-default'}
            ${!props.disabled && (props.backgroundColor ?? 'bg-neutral-600')}
            ${!props.disabled && (props.hoverColor ?? 'hover:bg-neutral-500')}
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
        `}>
            {props.leftContent}
            {(props.content || props.description) && (
                <div className={`flex flex-col items-start ${props.classNameContent}`}>                    
                    <div>{props.content}</div>
                    <div className="text-sm text-neutral-300">{props.description}</div>
                </div>
            )}
            {props.rightContent}
        </NextLink.default>
    )
}

export default Link;