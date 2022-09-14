import { FormikErrors, FormikValues } from 'formik';
import { isDefined } from '@rnw-community/shared';

export const hasErrors = (
  hasError: keyof FormikErrors<FormikValues> | any,

  isTouched?: boolean | any
): boolean => isDefined(isTouched && hasError);
