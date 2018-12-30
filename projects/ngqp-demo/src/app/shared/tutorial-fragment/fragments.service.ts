import { Injectable } from '@angular/core';

export interface Fragment {
    name: string;
    id: string;
    indent: number;
}

@Injectable()
export class FragmentsService {

    public fragments: Fragment[] = [];

    public addFragment(item: Fragment) {
        this.fragments = [...this.fragments, item];
    }

}
