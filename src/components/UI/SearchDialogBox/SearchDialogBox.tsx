import { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';

import { DialogBox } from 'components/UI/DialogBox/DialogBox';
import { AutoComplete } from 'components/UI/Form/AutoComplete/AutoComplete';
import styles from './SearchDialogBox.module.css';

export interface SearchDialogBoxProps {
  title: string;
  handleOk: Function;
  handleCancel: Function;
  options: any;
  selectedOptions?: any;
  icon?: any;
  optionLabel?: string;
  additionalOptionLabel?: string;
  onChange?: any;
  asyncSearch?: boolean;
  disableClearable?: boolean;
  searchLabel?: string;
  renderTags?: boolean;
  textFieldPlaceholder?: any;
  multiple?: boolean;
  buttonOk?: string;
  description?: string;
  colorOk?: string;
  fullWidth?: boolean;
  placeholder?: string;
  showTags?: boolean;
}

export const SearchDialogBox = (props: SearchDialogBoxProps) => {
  const {
    asyncSearch,
    icon,
    options,
    selectedOptions = null,
    title,
    handleOk,
    optionLabel,
    additionalOptionLabel,
    handleCancel,
    onChange,
    disableClearable,
    renderTags = true,
    textFieldPlaceholder = '',
    multiple = true,
    buttonOk = 'Save',
    description = '',
    colorOk,
    fullWidth = false,
    showTags = true,
    placeholder,
  } = props;

  const [selectedOption, setSelectedOptions] = useState<any>(multiple ? [] : null);
  const [asyncSelectedOptions, setAsyncSelectedOptions] = useState<Array<any>>([]);

  const [sortedOptions, setSortedOptions] = useState<any>(options);

  console.log(sortedOptions);

  useEffect(() => {
    if (multiple) {
      const selectedIds = selectedOptions.map((option: any) => option.id);
      setSortedOptions([
        ...selectedOptions,
        ...options.filter((option: any) => !selectedIds.includes(option.id)),
      ]);
    }
  }, [options]);

  useEffect(() => {
    if (!asyncSearch) {
      setSelectedOptions(
        multiple
          ? options.filter((option: any) => selectedOptions.includes(option.id))
          : selectedOptions
      );
    }
  }, [selectedOptions, options]);

  useEffect(() => {
    if (asyncSearch === true) {
      setAsyncSelectedOptions(selectedOptions);
    }
  }, [selectedOptions]);

  const changeValue = (event: any, value: any) => {
    setSelectedOptions(value);
    if (multiple) {
      const selectedIds = value.map((option: any) => option.id);

      setSortedOptions([
        ...value,
        ...options.filter((option: any) => !selectedIds.includes(option.id)),
      ]);
    }
  };

  const selectedOptionsIds = multiple
    ? selectedOptions.map(({ id }: { id: any }) => id)
    : selectedOptions?.id;

  const getIds = multiple ? selectedOption?.map((option: any) => option.id) : selectedOption?.id;

  return (
    <DialogBox
      title={title}
      handleOk={() =>
        handleOk(asyncSearch ? asyncSelectedOptions.map((option: any) => option.id) : getIds)
      }
      handleCancel={handleCancel}
      titleAlign="left"
      colorOk={colorOk}
      buttonOk={buttonOk}
      fullWidth={fullWidth}
    >
      <div>
        <FormControl fullWidth>
          <AutoComplete
            disableClearable={disableClearable}
            asyncSearch={asyncSearch}
            asyncValues={{ value: asyncSelectedOptions, setValue: setAsyncSelectedOptions }}
            options={sortedOptions}
            optionLabel={optionLabel || 'label'}
            additionalOptionLabel={additionalOptionLabel}
            field={{ value: selectedOption }}
            onChange={(value: any) => {
              if (onChange) {
                onChange(value);
              }
            }}
            form={{ setFieldValue: changeValue }}
            textFieldProps={{
              variant: 'outlined',
              placeholder: textFieldPlaceholder,
            }}
            chipIcon={icon}
            renderTags={renderTags}
            selectedOptionsIds={selectedOptionsIds}
            multiple={multiple}
            placeholder={placeholder}
            showTags={showTags}
          />
        </FormControl>
        <div className={styles.Description} data-testid="description">
          {description}
        </div>
      </div>
    </DialogBox>
  );
};
