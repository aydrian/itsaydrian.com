import type {  SVGProps } from "react";

import { cn } from "~/utils/css";

import type { IconName } from "./icons/types";

import spriteHref from "./icons/sprite.svg";

export enum IconSize {
	lg = "32",
	md = "24",
	sm = "16",
	xl = "40",
	xs = "12",
}

export interface IconProps extends SVGProps<SVGSVGElement> {
	className?: string
	name: IconName
	size?: IconSizes
	testId?: string
}

export type IconSizes = keyof typeof IconSize

/**
 * Icon component wrapper for SVG icons.
 * @returns SVG icon as a react component
 */
export const Icon = ({ className, name, size = "md", testId, ...props }: IconProps) => {
	const iconSize = IconSize[size]
	const iconClasses = cn("inline-block flex-shrink-0", className)
	return (
		<svg
			className={iconClasses}
			data-name={name}
			data-testid={testId}
			fill={"currentColor"}
			height={iconSize}
			stroke={"currentColor"}
			width={iconSize}
			{...props}
		>
			<title>{name}</title>
			<use href={`${spriteHref}#${name}`} />
		</svg>
	)
}
export type { IconName }
