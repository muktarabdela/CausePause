'use server';
/**
 * @fileOverview A flow for generating a 'Pause for a Cause' message based on a selected category.
 *
 * - generatePauseMessage - A function that generates the pause message.
 * - GeneratePauseMessageInput - The input type for the generatePauseMessage function.
 * - GeneratePauseMessageOutput - The return type for the generatePauseMessage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GeneratePauseMessageInputSchema = z.object({
  category: z.string().describe('The category for the pause message (e.g., "Environment", "Education", "Health")'),
});
export type GeneratePauseMessageInput = z.infer<typeof GeneratePauseMessageInputSchema>;

const GeneratePauseMessageOutputSchema = z.object({
  message: z.string().describe('The generated pause message based on the selected category.'),
});
export type GeneratePauseMessageOutput = z.infer<typeof GeneratePauseMessageOutputSchema>;

export async function generatePauseMessage(input: GeneratePauseMessageInput): Promise<GeneratePauseMessageOutput> {
  return generatePauseMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePauseMessagePrompt',
  input: {
    schema: z.object({
      category: z.string().describe('The category for the pause message.'),
    }),
  },
  output: {
    schema: z.object({
      message: z.string().describe('The generated pause message.'),
    }),
  },
  prompt: `You are an AI that generates a "Pause for a Cause" message.

The message should be short, impactful, and related to the given category.

Category: {{{category}}}

Message: `,
});

const generatePauseMessageFlow = ai.defineFlow<
  typeof GeneratePauseMessageInputSchema,
  typeof GeneratePauseMessageOutputSchema
>({
  name: 'generatePauseMessageFlow',
  inputSchema: GeneratePauseMessageInputSchema,
  outputSchema: GeneratePauseMessageOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
