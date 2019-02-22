this.paramGroup.valueChanges.pipe(
    switchMap(({ searchText, numberOfItems }) => this.api.fetch(searchText, numberOfItems)),

    // Don't forget to unsubscribe!
    takeUntil(this.componentDestroyed$),
).subscribe(response => {
    // …
});