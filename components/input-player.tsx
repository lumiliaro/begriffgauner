"use client";

import { Input } from "@nextui-org/input";
import { FieldHookConfig, useField } from "formik";
import { ReactElement } from "react";

export default function InputPlayer(
    props: { label: string } & FieldHookConfig<string>
): ReactElement {
    const [field, meta] = useField(props);

    return (
        <Input
            {...field}
            type="text"
            label={props.label}
            isInvalid={meta.touched && meta.error ? true : false}
            errorMessage={meta.touched && meta.error ? meta.error : undefined}
        />
    );
}
