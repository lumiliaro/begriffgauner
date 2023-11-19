"use client";

import { Input } from "@nextui-org/input";
import { FieldHookConfig, useField } from "formik";
import { ReactElement } from "react";

export default function InputPlayer(
    props: { label: string } & FieldHookConfig<string>
): ReactElement {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;

    return (
        <Input
            {...field}
            type="text"
            onValueChange={setValue}
            label={props.label}
            isInvalid={meta.touched && meta.error ? true : false}
            errorMessage={meta.touched && meta.error ? meta.error : undefined}
        />
    );
}
