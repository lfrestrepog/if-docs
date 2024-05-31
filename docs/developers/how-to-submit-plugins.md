---
sidebar-position: 5
---

# How to submit plugins


Once you have [built a plugin](./how-to-build-plugins.md) and made it [production ready](./how-to-refine-plugins.md) you probably want to share it with the world! 

We provide an IF Explorer website where you can list your plugins for the world to see.

By submitting your plugins to the Explorer you make them discoverable to other IF users. Users can browse or search the listed plugins and install them in their own pipelines. This is a great way to get exposure for your work and help grow the IF ecosystem. 

## Submitting a plugin

When you are happy with your plugin code, you can simply head to our submission portal and fill in the form. As long as you provide the requested information and your README is sufficiently detailed, your plugin will get listed on the site. 

It's as easy as filling in the form - we handle the rest!

## Acceptance criteria

You should answer all the questions on the submission form in order to list your plugin (it is ok to leave the npm field blank if you did not yet publish your plugin to npm).

However, we do want to see some specific information provided in your README.

Your plugin documentation should include the following information:

- A list of the required and optional parameters and return values, with types and any valid ranges/properties clearly defined (REQUIRED).
- A list of required and optional configuration (REQUIRED)
- A description of any environment setup such as credentials in environment variables, etc. (REQUIRED)
- Installation instructions (REQUIRED)
- A written description of the plugin behaviour (REQUIRED)
- A demo manifest that executes the plugin correctly without errors (REQUIRED)
- A link to your unit tests
- A list of errors that your plugin can raise, the behaviours that cause them and potential remedies.
- A reference list of any publications or other material supporting the approach you have taken in your plugin.

The more comprehensive the documentation, the more likely users are to downlaod and use your plugin.


## Disclaimer

We are only doing minimal QA on plugins. This amounts to checking that the necessary information is provided in a submission form and README. This means we are not checking that plugins execute correctly, provide accurate results or that they are free from security vulnerabilities. We provide no guarantee of fitness for any purpose, no warranty of any kind and no endorsement for any specific plugin. You **must** do your own research and do your own due diligence for any use of plugins listed on the explorer.
