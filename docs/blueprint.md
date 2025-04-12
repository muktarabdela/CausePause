# **App Name**: CausePause

## Core Features:

- YouTube Detection: Detect when the user navigates to www.youtube.com.
- Full-Screen Takeover: Take over the full screen and display a 'Pause for a Cause' message using a React UI.
- Delay Timer: Implement a timer that counts down a pre-defined delay period before unblocking YouTube.
- YouTube Unblocking: After the delay, remove the full-screen UI and allow YouTube to load and function normally.
- Message Generation: Generate a 'Pause for a Cause' message using a generative AI tool based on a category selected by the user.

## Style Guidelines:

- Primary color: Soft white or light gray for the background.
- Secondary color: A calming blue or green for the 'Pause for a Cause' message.
- Accent: A bright, contrasting color (e.g., orange or teal) for the timer display and interactive elements.
- Clear and readable sans-serif font for all text elements.
- Simple and recognizable icons for settings and options.
- Clean and minimalist layout to ensure the 'Pause for a Cause' message is the focal point.
- Smooth and subtle animation for the timer countdown.

## Original User Request:
i want to build a Chrome extension from scratch that does:

Core Functionality You'll Need to Implement:

YouTube Detection: The extension needs to detect when you are opening or navigating to YouTube (specifically www.youtube.com).
Full-Screen Takeover: When YouTube is detected, the extension should:
Prevent YouTube from immediately loading in its normal view.
Take over the full screen of the browser tab.
Display your "Pause for a Cause" message.
"Pause for a Cause" Display: This is the visual part. You'll need to create a user interface (UI) to:
Show the "Pause for a Cause" message.
Potentially add more features (as you mentioned).
Delay/Timer: Implement a timer that counts down the delay period you want.
YouTube Unblocking: After the delay is over, the extension should:
Remove the full-screen "Pause for a Cause" UI.
Allow YouTube to load and function normally in the same tab.

and i want to use react node js and if we need authentication and database supabase
  