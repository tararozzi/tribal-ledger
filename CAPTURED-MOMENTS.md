# Captured Moments photos

Admin can select Upload Photos or Import from Image URL in Weekly Recap.

- Up to 5 images per selection, 3 MiB per photo. JPEG, PNG, GIF, and WebP are supported; convert HEIC/HEIF or other formats first.
- Previews must decode successfully before saving. URL previews download the image on the server, validate status, format, and size, then show those downloaded bytes. Confirmation stores the same bytes in the existing Drive photo folder; the external URL is never saved as the display location.
- Images keep the selected recap week. Changing the editor week clears pending previews. Saves snapshot their week and caption before requests start.
- Files save independently. An active batch blocks repeated clicks, while per-photo request IDs and Drive receipts make uncertain-response retries idempotent.
- Remove hides only the selected photo's existing Photos row using Approved=FALSE. The file, caption, reaction identity, and other data remain available. Restore sets Approved=TRUE. Removing a photo does not trash its Drive file or revoke its sharing, and direct links may continue working.
- Existing public album layout, reactions, comments, recap history, and player login are unchanged. Master and recap admins can manage photos; limited admins cannot.
- URL fetching requires the Apps Script owner's authorization for script.external_request. Existing Drive, spreadsheet, and other required permissions remain necessary.

Source deployment: Apps Script uses the complete apps-script-live project in the workspace. The website uses index.html and api/apps-script.js; .gs files in this repository mirror the relevant backend changes, but are not a complete standalone Apps Script project.

Run photo tests from this repository with:

    node --test tests/recap-photo-storage.test.cjs tests/weekly-recap-photos.test.cjs
