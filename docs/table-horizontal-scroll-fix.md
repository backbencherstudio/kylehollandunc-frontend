# Table Horizontal Scroll on Small Devices

## Issue

On small viewports, the dashboard “Recent Request Forms” table was breaking the layout instead of showing a horizontal scrollbar. Users reported:

- No visible horizontal scrollbar when the table was wider than the viewport.
- The table (or entire page) expanding horizontally and breaking the layout.

## Root Causes

### 1. Main content area was the scroll container

`<main>` in `DashboardLayout` used `overflow-x-auto`. When the table was wider than the viewport:

- The **entire main** became the scroll container.
- The table’s own wrapper never had a constrained width, so the browser had no reason to show a scrollbar on the table itself.
- The scrollbar (if any) appeared at the edge of the main content, and the table still felt like it was “breaking” the layout.

### 2. Flex layout not constraining width

The flex wrapper around the main content did not use `min-w-0`. In flexbox, flex items default to `min-width: auto`, so they can grow to fit their content. As a result:

- The main content area could grow with the wide table.
- Width was never properly constrained, so `overflow-x-auto` on the table wrapper did not create a visible scrollbar.

### 3. Scrollbar visibility

Some browsers and operating systems use overlay or auto-hiding scrollbars. There was no styling to force a visible, always-on scrollbar when the table overflows.

## Solution Overview

1. **Constrain the layout** so the main content does not grow with the table.
2. **Make the table wrapper the only horizontal scroll container** so the scrollbar appears directly under the table.
3. **Style the scrollbar** so it is visible when the table overflows.

## Changes Made

### 1. `components/dashboard/DashboardLayout.tsx`

- **Content wrapper** (the flex child that holds Topbar + main):
  - Added `min-w-0` so the flex item can shrink and does not grow with wide content.
  - Added `flex flex-col` so the main area gets a clear width from the viewport.
- **`<main>`**:
  - Replaced `overflow-x-auto` with **`overflow-x-hidden`** so the main area does not scroll horizontally and does not expand with the table.
  - Added **`min-w-0`** and **`w-full`** so main has a bounded width and passes that constraint down to the table.

### 2. `components/reusable/DataTable.tsx`

- **Outer wrapper**: Added **`max-w-full`** so the table block cannot grow beyond its parent.
- **Scroll wrapper**: Added **`table-scroll-x`** (see globals) and kept **`min-w-0`** so this div is the scroll container and gets the visible scrollbar styles.

### 3. `components/ui/table.tsx`

- **Table container div** (around `<table>`):
  - Added **`min-w-0`** so the container can shrink inside flex parents.
  - Added **`table-scroll-x overflow-x-auto`** so this wrapper is the horizontal scroll container and uses the shared scrollbar styling wherever `Table` is used.

### 4. `app/globals.css`

- **`.table-scroll-x`** utility:
  - `overflow-x: auto` and `scrollbar-gutter: stable`.
  - WebKit scrollbar styling: fixed height (8px), track and thumb colors, hover state, so the horizontal scrollbar is visible when content overflows.

## Principle: Constraining width for overflow

For `overflow-x: auto` to show a scrollbar:

1. The scroll container must have a **width smaller than its content** (here, the `<table>`).
2. Every ancestor in the layout chain must allow that width to be constrained (e.g. with `min-w-0` in flex layouts and `overflow-x-hidden` or similar on the page so the page doesn’t grow).

So the fix was to:

- Stop the page/main from scrolling or growing horizontally (`overflow-x-hidden`, `min-w-0` on the main and its flex parent).
- Ensure the table lives in a wrapper that has a constrained width and `overflow-x-auto` (and `table-scroll-x` for visibility).

## Files touched

| File | Purpose |
|------|--------|
| `components/dashboard/DashboardLayout.tsx` | Constrain main and flex wrapper so table doesn’t stretch layout. |
| `components/reusable/DataTable.tsx` | Constrain table block and apply scroll wrapper + `table-scroll-x`. |
| `components/ui/table.tsx` | Table container as scroll container with `table-scroll-x`. |
| `app/globals.css` | `.table-scroll-x` for visible horizontal scrollbar. |

## Result

- On small viewports, the table stays inside the layout; the page does not scroll horizontally.
- A horizontal scrollbar appears on the table container when the table is wider than the viewport.
- The scrollbar is visible and styled (height, colors) for better usability.
