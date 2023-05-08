/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MyHeroLayout1OverridesProps = {
    MyHeroLayout1?: PrimitiveOverrideProps<FlexProps>;
    Left?: PrimitiveOverrideProps<FlexProps>;
    HeroMessage?: PrimitiveOverrideProps<FlexProps>;
    subtitle?: PrimitiveOverrideProps<TextProps>;
    Message?: PrimitiveOverrideProps<FlexProps>;
    title?: PrimitiveOverrideProps<TextProps>;
    paragraph?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
    Right?: PrimitiveOverrideProps<FlexProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type MyHeroLayout1Props = React.PropsWithChildren<Partial<FlexProps> & {
    breakpoint?: "large" | "medium" | "small";
} & {
    overrides?: MyHeroLayout1OverridesProps | undefined | null;
}>;
export default function MyHeroLayout1(props: MyHeroLayout1Props): React.ReactElement;
