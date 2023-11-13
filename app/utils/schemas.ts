import { number, z } from "zod";

export const playFormSchema = z.object({
    playerCount: number({
        required_error: "Number of players is required",
        invalid_type_error: "Number of players must be a number",
    })
        .min(3)
        .max(10)
        .int(),
    wordList: z
        .object({
            label: z.string(),
            value: z.string(),
            words: z.array(z.string()),
        })
        .superRefine((wordList, context) => {
            if (
                wordList.label === "" ||
                wordList.value === "" ||
                wordList.words.length === 0
            ) {
                context.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Words are required",
                });
            }
        }),
});

export type PlayForm = z.infer<typeof playFormSchema>;
