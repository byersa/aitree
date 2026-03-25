---
description: How to generate and refine Moqui screens using Blueprint Markdown files
---

# Screen Blueprint Generation and Refinement

This workflow describes how to use the standardized Markdown templates in the `blueprints/screen/` directory to direct an AI agent (like Qwen) to generate Moqui XML screens and associated Vue/Quasar components.

## 1. Blueprint Template Structure
Always start with the `ScreenTemplate.md`. The template includes:
- **XSD Conformance**: Sections for `web-settings`, `parameter`, `actions`, `transition`, `widgets`, etc., mirroring `xml-screen-3.xsd`.
- **Frontend Integration**: Sections for `screen-events`, `computed-fields`, `watched-fields`, `methods`, `custom-data-fields`, and `pinia-store-interactions`.
- **Quality Assurance**: `test-plan` and `test-result` sections.

## 2. Directive Keywords for Transitions
To ensure precise generation of transition logic, use these keywords in the description:
- **Data Fetch**: Indicates the need for `<entity-find>`.
- **Data Write**: Indicates the need for `<service-call>` with side effects.
- **Conditional Flow**: Indicates the need for `<if>`/`<else>` branching.

## 3. Vue/Quasar Integration Rules
- **Moqui First**: Prioritize standard Moqui components (`m-form-single`, etc.) which map to Vue.
- **Judicious Injection**: Use `<render-mode><text type="html,vuet">` for raw Quasar (`q-*`) components only when standard Moqui components are insufficient.
- **State Mapping**: Explicitly define `pinia-store-interactions` and `custom-data-fields` to avoid AI hallucinations of non-existent state variables.

## 4. Generation Process
1. **Instantiate**: Copy `ScreenTemplate.md` to the target path (e.g., `blueprints/screen/aitree/Meetings/MyScreen.md`).
2. **Describe**: Fill out the relevant sections. Keep "No content available" for unused sections.
3. **Generate**: Provide the populated blueprint to the AI assistant with the directive: "Generate the Moqui XML screen file following the instructions in this blueprint."
4. **Refine**: Update the blueprint based on testing and re-generate as needed.
