import React, { useState, useEffect, useCallback } from 'react';
import { useFormikContext } from 'formik';
import _, { debounce } from 'lodash';

const AutoSave = ({ debounceMs = 3000 }) => {
    const formik = useFormikContext();
    const [lastSaved, setLastSaved] = React.useState(null);
    const debouncedSubmit = React.useCallback(
      debounce(
        () =>
          formik.submitForm().then(() => setLastSaved(new Date().toISOString())),
        debounceMs
      ),
      [debounceMs, formik.submitForm]
    );
  
    React.useEffect(() => {
      debouncedSubmit();
    }, [debouncedSubmit, formik.values]);
  
    let result = null;
  
    if (!!formik.isSubmitting) {
      result = "saving...";
    } else if (Object.keys(formik.errors).length > 0) {
      result = `ERROR: ${formik.errors.error}`;
    } else if (lastSaved !== null) {
      result = `Last Saved: ${lastSaved}`;
    }
    return <>{result}</>;
};

export default AutoSave;