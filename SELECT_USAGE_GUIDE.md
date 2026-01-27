# TextInputField Select Variant - Usage Guide

The `TextInputField` component now supports a **select dropdown** variant, styled to match the MenuButton component from the Proposal page.

## Features

✅ Consistent styling with existing form inputs
✅ Error state handling with red styling
✅ Disabled state support
✅ Smooth transitions and animations
✅ Accessibility features (ARIA labels, keyboard navigation)
✅ React Hook Form compatible
✅ Headless UI Menu component under the hood

## Basic Usage

```tsx
import TextInputField, { type SelectOption } from "@/Reusables/TextInputField";

// Define your options
const toneOptions: SelectOption[] = [
  { label: "Professional", value: "professional" },
  { label: "Friendly", value: "friendly" },
  { label: "Casual", value: "casual" },
  { label: "Formal", value: "formal" },
];

// Use in your component
<TextInputField
  id="tone-selector"
  name="tone"
  label="Select Tone"
  type="select"
  placeholder="Choose a tone"
  options={toneOptions}
  value={selectedTone}
  onChange={(e) => setSelectedTone(e.target.value)}
  required
/>
```

## With React Hook Form

```tsx
import { Controller, useForm } from "react-hook-form";
import TextInputField, { type SelectOption } from "@/Reusables/TextInputField";

const options: SelectOption[] = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
];

function MyForm() {
  const { control, formState: { errors } } = useForm();

  return (
    <Controller
      name="mySelect"
      control={control}
      render={({ field }) => (
        <TextInputField
          id="mySelect"
          label="Choose Option"
          type="select"
          placeholder="Select an option"
          options={options}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          touched={!!errors.mySelect}
          error={errors.mySelect?.message}
          required
        />
      )}
    />
  );
}
```

## Props

### Select-Specific Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"select"` | Yes | Set to "select" to enable dropdown mode |
| `options` | `SelectOption[]` | Yes | Array of options with `label` and `value` |
| `placeholder` | `string` | No | Text shown when no option is selected |

### Common Props (Inherited)

- `id`: string (required)
- `name`: string
- `label`: string (required)
- `value`: string
- `onChange`: function
- `onBlur`: function
- `touched`: boolean
- `error`: string
- `required`: boolean
- `disabled`: boolean

## Styling

The select variant matches the styling from `Proposal.tsx`:
- Rounded corners (`rounded-xl`)
- Gray background with hover effects
- Red error states
- Smooth transitions
- Focus ring effects
- Disabled state styling

## Example: Replacing Proposal.tsx MenuButton

**Before:**
```tsx
<Menu as="div" className="relative inline-block w-full">
  <label className="block text-sm mb-2">Proposal Tone</label>
  <MenuButton className="...">
    {field.value ? proposalToneOptions.find(t => t.value === field.value)?.label : "Select Option"}
    <ChevronDownIcon className="ml-auto size-5 text-gray-400" />
  </MenuButton>
  <MenuItems>
    {/* ... */}
  </MenuItems>
</Menu>
```

**After:**
```tsx
<TextInputField
  id="proposal-tone"
  name="proposalTone"
  label="Proposal Tone"
  type="select"
  placeholder="Select Option"
  options={proposalToneOptions}
  value={field.value}
  onChange={field.onChange}
  onBlur={field.onBlur}
  touched={!!errors.proposalTone}
  error={errors.proposalTone?.message}
  required
/>
```

## Notes

- The component automatically displays the selected option's label
- Falls back to placeholder text when no option is selected
- Fully compatible with form validation libraries
- Maintains consistent styling with other TextInputField variants
