Hey! I'm looking on the part two of this feature docs/plans/onboarding-v1.md Basically, the onboarding V2.

For this iteration, we'll made a few changes a new features:

Changes:

1. For the stepper component, I want to add a line between each circled step, this is an design improvement, actually looks like this:
   o o o (o represents a step)
   And I want it to look like this:
   o - o - o (o represents a step)

2. In the buttons, we need to add cursor: pointer when a user hover over it.
3. I need to add the ability to select two new colors variations for the cat:

- Eye color
- Tail color

Also, for the color selectors, I need you to help me creating a new component, called something like "CatColorSelector"
Because, I want you to help me redesigning a bit of this, Instead a label and the color picker, I want, the label, the color picker, and an icon representing what part of the body you're picking a color for, for this purpose use the skill $svg-icon-generator and spawn a subagent for each icon you neeed to generate.

New features:

1. Language selector, basically this, I just need an input selector that will render two options (english and spanish) and it will change the language of the application. For the onboarding, you will render it on the right corner of the onboarding card, create a dumb selector component for this following our design system, the logic of the language should live in a hook, the hook must be called something like, useTranslation or something like that, will contain the following methods:

- a state variable called "language", will default to the user browser language
- getTranslation, will receive as key an enum and will return the text with its corresponding translation, this must be a useCallback with a dependency on the state of the state variable called "language"
- all the translation logic must live strictly in the main container, then, the translation component or the getTranslation function must be spreaded from the principal container to it's subcontainers and it's components, to its subcomponents, etc.

2. Second step.
   Here the user should be able to select between two options:

a. Schedule block
b. Usage time block

Depending on what option the user selects, it will render two views:

For schedule block, let's create a reusable container, because we will use this container and view for the settings page outside the onboarding.
So, for this container, the user will see all it's schedules, if the user has an schedule, the user will be able to see a collapsable cards of each schedule he has, the card must be a component, it will contain a resume of the schedule block, if the user selects or click an schedule, the card will expand the card and this expansion will un-render or hide the resume and will render the Schedule Block create/edit form, and the user should be able to edit the data of the schedule.
For this container, the view should contain a "create schedule block" button on the top right corner (only valid and rendered outside onboarding).
Also, if an user expands an existing schedule block card, inside this component on the bottom right corner a button to delete the schedule. If the user clicks it, a modal will be rendered to confirm the action.
When a user expands the card, an close button (with an x icon) will be rendered on the top right corner of the expanded card, this button will be hidden if the card is collapsed.

If the user has zero schedules we'll render a view saying something like "Let's start with your focus, create your first schedule", with a "create my first schedule" button, the button will expand the card and this expansion will un-render or hide the resume and will render the Schedule Block create/edit form.

The following behaviours are only valid if the container has the {isOnboarding} prop in "true":

1. When the user renders the container view, there are two possibilities:
   a. The user are resuming the onboarding and has an existing schedule block, in that case, render that card expanded and ready to edit
   b. The user has no schedule block, render the onboarding label and button to create his first schedule

2. The user must not be able to create more than one schedule
3. The user must not be able to delete any schedule, so, the delete schedule button will not be rendered when the card gets expanded if it's onboarding view
4. The user must not be able to collapse the card of the existing schedule block if exists

Shedule Block Create/Edit Form with the following data to fill or select:

Input Name: Name of the schedule
Input Type: Text
Output Type: Text
Required: true
Default label: Work 🧑🏻‍💻
Validations

- Must Not be empty
- Must have more than 4 characters
- If you see another util validation, put it here

Input Name: Name of the schedule
Input Type: Enable/Disable Multiple Selector
Output Type: JSON -> Schema: {
monday: Boolean,
tuesday: Boolean,
wednesday: Boolean,
thursday: Boolean,
friday: Boolean,
saturday: Boolean,
sunday: Boolean
} (All required)
Required: true
Default label: Not applicable
Default Value: Enabled Mon to Fri
Validations: None

For this input, create a dedicated dumb component, the component will handle the state internally.
The commponent will recieve as parameter the schema of the enable-disable options, with the following schema:
[
{
name(str): "monday"
label(str): "Lunes"
default(bool): true,
}
]
This input will be a referencial component, so it's ref will have a state property called value, the value will be the actual value of each name and the value the user selected in dictionary format {key: value} where key = name-prop and value = user-selection (bool, enabled/disabled), followin the example, will look like: {"monday": true}.
For this purpose, use the following react hook: https://react.dev/reference/react/useImperativeHandle. Don't forget to type and document this component very carefully.

Input Name: From (Init of the schedule)
Input Type: Clock Time 24HRS Format (23:00)
Input Format: 24-hour (23:49)
Output Type: Text
Required: true
Default value: 06:00

Input Name: To (Init of the schedule)
Input Type: Clock Time 24HRS Format (23:00)
Input Format: 24-hour (23:49)
Output Type: Text
Required: true
Default value: 18:00

Input Name: Websites to block
Input Type: Array<String>
Output Type: JSON -> Schema: [{
name: "Instagram",
domain: "www.instagram.com" | it doesnt care if the user puts an url like this (instagram.com/subpath/subpath) we will only conserve the domain, in the example (instagram.com),
}]
Required: true
Default label: e.g: instagram.com
Default Value: None
Validations:

- Min 1 element in the array
- Valid website validation before adding the element to the array, use regexp for this

Abilities of the component:

- Create 1 element
- Delete 1 element
- Edit 1 element

Data persistency logic:

- Persist this data using a new repository for schedules that you will need to create, use the storage API @src/lib/chrome/storage.ts and follow the existing approaches in src/lib/repositories.
- Save this data with the name (schedule-block-data)
- In this case, we just need the following methods:
  -- InsertOne (Inserts one schedule)
  -- UpdateOneUd (Update one schedule by id)
  -- FindAll (Finds all schedules with full data)
  -- DeleteOneById (Delete one schedule by id)
- The persisted data will follow this schema, where each element of the array represents one schedule block:
  {
  "id": "required | random uuid",
  "name": "required | name of the schedule",
  "schedule": {
  "days": {
  monday: Boolean,
  tuesday: Boolean,
  wednesday: Boolean,
  thursday: Boolean,
  friday: Boolean,
  saturday: Boolean,
  sunday: Boolean
  },
  "time": {
  from: "required | from hour | eg: 07:00",
  to: "required | to hour | eg: 18:00"
  }
  },
  "sites": [
  {"name": "required | name of the site | eg: Instragam", "domain": "required | the site domain to block | eg: www.instagram.com"}
  ]
  }

For this input, also create a shared component.
Usage Time limit will be worked in the next iteration, for the moment, if the user selects "Usage time block", then we'll render something like "Under construction"

Edge Cases:

- If an user saves an schedule,

Refactors:

- avoid setting the styles in constants like "ONBOARDING_STEP_ONE_LAYOUT_CLASS_NAME", the constants file should be used strictly for real constants, please update all the AGENTS.override that contains references about the usage of constants to make sure having this in mind in future approaches
- avoid having methods like this `getStepItems()` for things that depend on state, for this things use the useMemo hook and reference the dependency.
