import type { FieldValues, SubmitHandler, UseFormReturn, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { AppError } from "./server/errors";

interface Feedbacks {
  setError?: UseFormSetError<any>;
}
export function showServerError({ setError }: Feedbacks) {
  return (error: AppError) => {
    if (!error) return;
    console.error(error.message);
    if (error && error.message) {
      toast.error(error.message, {
        description: error.statusCode && `Request Failed - ${error.statusCode}`,
      });
    }
    // if (error.validationErrors) {
    //   if (setError) {
    //     Object.entries(error.validationErrors).forEach(([field, message]) => {
    //       setError?.(field, {
    //         message,
    //       });
    //     });
    //   } else {
    //     console.error("ERROR: form's setError is not defined");
    //   }
    // }
  };
}
export function handleActionSubmit<
  TFieldValues extends FieldValues,
  TResponse,
  TTransformedValues extends FieldValues | undefined,
  TValues extends TTransformedValues extends undefined ? TFieldValues : TTransformedValues
>(
  form: UseFormReturn<TFieldValues, any, TTransformedValues>,
  action: (values: TValues) => Promise<TResponse>,
  options?: {
    onSuccess?: (result: Awaited<TResponse>, context: TFieldValues) => Promise<void> | void;
    onError?: (error: AppError, context: TFieldValues) => void;
    showErrors?: boolean;
    preprocess?: (data: TValues) => TValues;
  }
) {
  return (e?: React.BaseSyntheticEvent) =>
    form.handleSubmit((async (data: Parameters<typeof action>[0]) => {
      const context = form.getValues();
      const showErrors = options?.showErrors ?? options?.onError === undefined;
      const response = await action(options?.preprocess ? options.preprocess(data) : data).catch(
        (error: AppError) => {
          if (showErrors) {
            showServerError({ setError: form.setError })(error);
          }
          options?.onError?.(error, context);
        }
      );
      if (response) {
        await options?.onSuccess?.(response as Awaited<TResponse>, context);
      }
    }) as TTransformedValues extends undefined ? SubmitHandler<TFieldValues> : TTransformedValues extends FieldValues ? SubmitHandler<TTransformedValues> : never)(
      e
    );
}
export function showMutationError(feedbacks: Feedbacks) {
  return (error: AppError) => showServerError(feedbacks)(error);
}
