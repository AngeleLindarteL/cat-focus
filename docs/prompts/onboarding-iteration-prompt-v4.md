I need to create a plan to iterate an accomplish the part 4 of the onboarding docs/plans/onboarding-\*.md. Basically we will be working on the onboarding-v4.

New features:

# 1. Usage time block

We will be creating the usage time block for onboarding, similar to v2. We will be creating a reusable usage time block module.
So, basically this feature or this mode, is a way the user can limit the time he spends on a determined set of websites, the entity usage-block looks like this:

## 1.1 Schema

```json
{
  "user-name": "required | user name | eg: Jhon Doe",
  "installation-reason": "required | the reason the user installed this extension | eg: to dedicate more time to read",
  "language": "optional | legacy field | check @docs/plans/onboarding-v2.md for more info and @changelog.md"
}
```

## 1.2 Notes

This form should be reusable, because we will re-use it in the near future, this form should support two modes "edition" | "creation".

Once you click "Finish" Onboarding button, the state of the onboarding will be updated, @onboardingRepository.ts
And you will be redirected to the onboarding finish screen

## 1.3 Form inputs

Input Name: user-name
Input Type: Text
Output Type: Text
Required: true
placeholder: Your name (e.g John Doe)
Validations:

- Must Not be empty
- Minimum 3 characters

Input Name: installation-reason
Input Type: Text
Output Type: Text
Required: true
placeholder: Tell us the reason why you installed this extension, we will redmind you about this every time you try to break our limits.

Validations:

- Must Not be empty
- Minimum 3 characters
- Maximum 1000 characters

## 1.4 Data persistency logic:

The persistency layer already exists, this form will save on user preferences, the actual implementation is here:
@src/lib/repositories/userPreferencesRepository.ts
@src/lib/repositories/userPreferencesRepository.constants.ts
@src/lib/repositories/userPreferencesRepository.interfaces.ts

You'll need to update the existing implementation to receive and save/update the values we're adding in this repo.

Important notes:

1. Use existing forms as a reference to the form you will create

Refactors:

1. Finish onboarding label should be renamed for something like "Start your journey" or something more marketable

# 2 Onboarding Finish Screen

When a user finish the onboarding, a congratulations screen will be shown to the user. The screen it's simple, should render:
A confetti animation using this lib: https://confetti.js.org/#usage

1. A title saying "Congratulations"
2. The Cat the user customized in the center
3. A phrase from Confucius "No importa lo lento que vayas, siempre y cuando no te detengas" (translate it to english accordingly)
4. A button to get you to the home of the options page.
