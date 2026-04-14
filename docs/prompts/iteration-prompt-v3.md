I need to create a plan to iterate an accomplish the part 3 of this iteration docs/plans/onboarding-v2.md. Basically we will be working on
the onboarding-v3.

New features:

1. Usage time block

We will be creating the usage time block for onboarding, similar to v2. We will be creating a reusable usage time block module.
So, basically this feature or this mode, is a way the user can limit the time he spends on a determined set of websites, the entity usage-block looks like this:

1.1 Schema

```json
{
  "id": "required | random uuid",
  "name": "required | name of the group to block | eg: Adult websites",
  "limit": {
    "time": "required | description: the limit of time the user can spend on each page | HH:MM | eg: 07:00",
    "resetsAt": "required | note: this is not editable by user | HH:MM | defaults to: 00:00"
  },
  "sites": [
    {
      "name": "required | name of the site | eg: Instragam",
      "domain": "required | the site domain to block | eg: www.instagram.com"
    }
  ]
}
```

1.2 Notes
Remember, since we're creating a reusable module, we will have an onboarding view, and a normal view.
In the normal view, we will render a list of limits, with a card containing a resume of the usage limit, and is expandable by clicking it, when you click it, it will expand the card and it will show the form to edit the limit. Also, it will be collapsable like the schedule-block card.

Another thing, base entirely the form on the actual implemented for schedule based block, so, use that as a base to work and adapt it to create the usage limit form.

The following behaviours are only valid if the container has the {isOnboarding} prop in "true":

1. When the user renders the container view, there are two possibilities:
   a. The user are resuming the onboarding and has an existing usage block, in that case, render that card expanded and ready to edit
   b. The user has no usage block, render the onboarding label and button to create his first usage

2. The user must not be able to create more than one usage
3. The user must not be able to delete any usage, so, the delete usage button will not be rendered when the card gets expanded if it's onboarding view
4. The user must not be able to collapse the card of the existing usage block if exists

Usage Block Create/Edit Form with the following data to fill or select:

1.3 Form inputs

Input Name: Name of the block limit
Input Type: Text
Output Type: Text
Required: true
Default label: Adult sites
Validations

- Must Not be empty
- Minimum 3 characters

Input Name: Limit (Daily)
Input Type: Clock Time 24HRS Format (23:00)
Input Format: 24-hour (23:49)
Output Type: Text
Required: true
Default value: 01:00

Input Name: Websites to block (Reuse the existing component for this, and put it in the general components folder)
Input Type: Array<String>
Output Type: JSON -> Schema: [{
name: "Instagram",
domain: "www.instagram.com" | it doesnt care if the user puts an url like this (instagram.com/subpath/subpath) we will only conserve the domain, in the example (instagram.com),
}]
Required: true
Default Value: None
Validations:

- Min 1 element in the array
- Valid website validation before adding the element to the array, use regexp for this

Abilities of the component:

- Create 1 element
- Delete 1 element
- Edit 1 element

IMPORTANT NOTE: This form will also have the popular sites component/section, if this is not already a component, make it a component and put in the shared folder.

Data persistency logic:

- Persist this data using a new repository for schedules that you will need to create, use the storage API @src/lib/chrome/storage.ts and follow the existing approaches in src/lib/repositories.
- Save this data with the name (usage-block-data)
- In this case, we just need the following methods:
  -- InsertOne (Inserts one usage block)
  -- UpdateOneUd (Update one usage block by id)
  -- FindAll (Finds all usage blocks with full data)
  -- DeleteOneById (Delete one usage block by id)
- The persisted data will follow the schema I mentioned you on section 1.1, where each element of the array represents one usage block:

Remember to implement the usageBlockTimeValid variable, basically, I want the user to be able to continue to step three if he has created an scheduled based block or a usage based block, if it has both is also valid, this should be an or validation (a || b)

Refactors:

1. Both for Schedule Block Form and Usage based form, if there's an active change that's not saved, you will lock the stepper and the back/next functionalities until the change is saved.

Important notes:

1. Copy all the existing behaviours that can be copied from @ScheduleBlockForm.tsx to the form you will be created, behaviours like:

- dirty/draft edition advice for the user
