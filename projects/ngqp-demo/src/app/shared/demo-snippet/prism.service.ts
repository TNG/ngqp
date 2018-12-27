import { Injectable } from '@angular/core';

import * as prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

@Injectable({
    providedIn: 'root'
})
export class PrismService {

    public highlight(code: string, language: string): string {
        return prism.highlight(code, prism.languages[ language ]);
    }

}
