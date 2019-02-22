this.paramGroup.valueChanges.pipe(
    // Don't forget to unsubscribe!
    takeUntil(this.componentDestroyed$),

    switchMap(({ searchText, numberOfItems }) => this.api.fetch(searchText, numberOfItems)),
).subscribe(response => {
    // …
});