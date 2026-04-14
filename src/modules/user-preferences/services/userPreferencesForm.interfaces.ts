export type UserPreferencesFormValues = {
  userName: string;
  installationReason: string;
};

export type UserPreferencesValidationMessages = {
  nameRequired: string;
  nameMinLength: string;
  reasonRequired: string;
  reasonMinLength: string;
  reasonMaxLength: string;
};

