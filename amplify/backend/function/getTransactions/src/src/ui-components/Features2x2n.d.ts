/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Features2x2nOverridesProps = {
    Features2x2n?: PrimitiveOverrideProps<FlexProps>;
    "Frame 136"?: PrimitiveOverrideProps<FlexProps>;
    top?: PrimitiveOverrideProps<FlexProps>;
    top1?: PrimitiveOverrideProps<FlexProps>;
    titleA?: PrimitiveOverrideProps<TextProps>;
    paragraphA?: PrimitiveOverrideProps<TextProps>;
    top2?: PrimitiveOverrideProps<FlexProps>;
    titleB?: PrimitiveOverrideProps<TextProps>;
    paragraphB?: PrimitiveOverrideProps<TextProps>;
    bottom?: PrimitiveOverrideProps<FlexProps>;
    bottom1?: PrimitiveOverrideProps<FlexProps>;
    titleC?: PrimitiveOverrideProps<TextProps>;
    paragraphC?: PrimitiveOverrideProps<TextProps>;
    bottom2?: PrimitiveOverrideProps<FlexProps>;
    titleD?: PrimitiveOverrideProps<TextProps>;
    paragraphD?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type Features2x2nProps = React.PropsWithChildren<Partial<FlexProps> & {
    breakpoint?: "large" | "medium";
} & {
    overrides?: Features2x2nOverridesProps | undefined | null;
}>;
export default function Features2x2n(props: Features2x2nProps): React.ReactElement;
