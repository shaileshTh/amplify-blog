/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MyFigmaNavOverridesProps = {
    MyFigmaNav?: PrimitiveOverrideProps<ViewProps>;
    "Group 29"?: PrimitiveOverrideProps<ViewProps>;
    "Star 1"?: PrimitiveOverrideProps<IconProps>;
    Logo?: PrimitiveOverrideProps<TextProps>;
    "Group 28"?: PrimitiveOverrideProps<ViewProps>;
    Home?: PrimitiveOverrideProps<TextProps>;
    Products?: PrimitiveOverrideProps<TextProps>;
    About?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type MyFigmaNavProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: MyFigmaNavOverridesProps | undefined | null;
}>;
export default function MyFigmaNav(props: MyFigmaNavProps): React.ReactElement;
