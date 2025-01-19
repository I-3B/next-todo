import type {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
  UseFormSetError,
} from "react-hook-form";
import { toast } from "sonner";
import { AppError } from "../app-error";

export function formName<
  TForm extends ReturnType<typeof useForm<any, any, any>>,
>(name: Parameters<TForm["setValue"]>[0]) {
  return name;
}

interface Feedbacks {
  setError?: UseFormSetError<any>;
}
export function showServerError({ setError }: Feedbacks) {
  return (error: AppError) => {
    if (!error) return;
    if (error.message) console.log(error.message);
    if (error && error.message) {
      toast.error(error.message, {
        description: error.statusCode && `Request Failed - ${error.statusCode}`,
      });
    }
    if (error.validationErrors) {
      if (setError) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError?.(field, {
            message,
          });
        });
      } else {
        console.error("ERROR: form's setError is not defined");
      }
    }
  };
}
export function handleActionSubmit<
  TFieldValues extends FieldValues,
  TResponse,
  TTransformedValues extends FieldValues | undefined,
  TValues extends TTransformedValues extends undefined
    ? TFieldValues
    : TTransformedValues,
>(
  form: UseFormReturn<TFieldValues, any, TTransformedValues>,
  action: (
    values: TValues,
  ) => Promise<
    | { result: TResponse; error: undefined }
    | { result: undefined; error: AppError }
  >,
  options?: {
    onSuccess?: (
      result: Awaited<TResponse>,
      context: TFieldValues,
    ) => Promise<void> | void;
    onError?: (error: AppError, context: TFieldValues) => void;
    showErrors?: boolean;
    preprocess?: (data: TValues) => TValues;
  },
) {
  return (e?: React.BaseSyntheticEvent) =>
    form.handleSubmit((async (data: Parameters<typeof action>[0]) => {
      const context = form.getValues();
      const showErrors = options?.showErrors ?? options?.onError === undefined;
      const response = await action(
        options?.preprocess ? options.preprocess(data) : data,
      );
      if (response.result) {
        await options?.onSuccess?.(
          response.result as Awaited<TResponse>,
          context,
        );
      }
      if (response.error) {
        if (showErrors) {
          showServerError({ setError: form.setError })(response.error);
        }
        options?.onError?.(response.error, context);
      }
    }) as TTransformedValues extends undefined
      ? SubmitHandler<TFieldValues>
      : TTransformedValues extends FieldValues
        ? SubmitHandler<TTransformedValues>
        : never)(e);
}
export function showMutationError(feedbacks: Feedbacks) {
  return (error: AppError) => showServerError(feedbacks)(error);
}
