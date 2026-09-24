# Weekly Recap videos and presentation

Video Links appears below the recap discussion/photos and at the bottom of its Admin section. Add up to 20 HTTP(S) links, each with an optional title and description. Save Video Links applies additions, edits and deletions to the selected week independently of the recap body and photos. Links open in a new tab; external content is not embedded or downloaded.

Data is stored in a separate RecapVideos sheet, created only on the first successful save. Existing WeekRecaps, Photos, reactions and comments are not migrated or rewritten. The sheet stores Week, LinksJson and Revision. Revision checks prevent stale editors from overwriting newer saves. Recap publication timing also applies to video-only weeks. Admin permissions match existing recap editing.

The recap editor reuses its one existing toolbar, retaining bold, italic, underline, unordered and numbered lists, both indentation controls and links. Player-facing recap title text is always bold. Camp Rules uses the same announcement card styling as Camp Announcements with equal desktop column widths; saved content is unchanged.

Validation: 111 regression tests; browser checks of toolbar initialization twice, all eight controls, title weight, matching computed card styles, add/edit/delete flows, and 390px mobile overflow. Test video links were only added to local fixtures.
