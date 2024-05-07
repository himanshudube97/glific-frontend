import { Input } from 'components/UI/Form/Input/Input';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { FormLayout } from '../FormLayout/FormLayout';
import { useState } from 'react';
import styles from '../FormLayout/FormLayout.module.css';
import { PaymentOptions } from '../PaymentType/PaymentOptions';
import { FormStepProps } from './OrgDetails';

export const PaymentDetails = ({ handleStepChange, saveData }: FormStepProps) => {
  const { t } = useTranslation();
  const [billing_frequency, setPaymentType] = useState<string>('yearly');
  const [name, setName] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const FormSchema = Yup.object().shape({
    name: Yup.string().required(t('This Field is required.')),
    designation: Yup.string().required(t('This Field is required.')),
    phone: Yup.string()
      .required(t('This Field is required.'))
      .length(10, 'Enter a valid phone number.'),
    email: Yup.string().required(t('This Field is required.')).email('Enter a valid email.'),
  });
  const initialFormValues: any = { name, designation, phone, email, billing_frequency };

  const formFields = [
    {
      label: 'Preferred billing frequency.',
      children: [
        {
          component: PaymentOptions,
          name: 'paymentOption',
          handleOnChange: (value: any) => setPaymentType(value),
          billing_frequency: billing_frequency,
          additionalStyles: styles.FullWidth,
        },
      ],
    },
    {
      component: Input,
      name: 'name',
      type: 'text',
      inputLabel: 'Name',
      placeholder: 'Enter full name.',
    },
    {
      component: Input,
      name: 'designation',
      type: 'text',
      inputLabel: 'Designation',
      placeholder: 'Enter the designation.',
    },
    {
      component: Input,
      name: 'phone',
      type: 'text',
      inputLabel: 'Phone Number',
      placeholder: 'Enter 10-digit phone number.',
    },
    {
      component: Input,
      name: 'email',
      type: 'text',
      inputLabel: 'Email address',
      placeholder: 'Enter your email address.',
      inputLabelSubtext: (
        <span className={styles.SubText}>(Invoice will be sent to this email)</span>
      ),
    },
  ];

  const setPayload = (payload: any) => {
    const object = {
      ...payload,
      billing_frequency: billing_frequency,
    };
    return object;
  };

  const setStates = (states: any) => {
    const { name, designation, phone, email, billing_frequency } = states;
    setName(name);
    setDesignation(designation);
    setPhone(phone);
    setEmail(email);
    setPaymentType(billing_frequency);
  };

  return (
    <FormLayout
      validationSchema={FormSchema}
      formFieldItems={formFields}
      initialValues={initialFormValues}
      step={3}
      title="Payment details"
      helperText="Add payment information and choose the billing frequency"
      setStates={setStates}
      setPayload={setPayload}
      identifier="payemntDetails"
      handleStepChange={handleStepChange}
      saveData={saveData}
    />
  );
};
