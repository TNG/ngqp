import { Component } from '@angular/core';
import { createStringDeserializer, QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { faAlignLeft, faCogs, faGlassCheers, faHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface BenefitItem {
    icon: IconDefinition;
    title: string;
    description: string;
}

@Component({
    selector: 'demo-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {

    public faGithub = faGithub;
    public benefits: BenefitItem[] = [
        {
            icon: faGlassCheers,
            title: 'Simple',
            description: `
                Developers expect tools to just work. That's why ngqp requires almost no setup and is easy to use while
                giving you the flexibility to configure it to your needs. The API feels familiar because it is designed after
                the Forms API.
            `,
        },
        {
            icon: faCogs,
            title: 'Powerful',
            description: `
                Any tool is only as good as it is useful; that's why ngqp ships with a lot of features that allow you to do
                exactly what you need to do, nicely packed into an intuitive API so you don't need to scratch your head.
            `,
        },
        {
            icon: faAlignLeft,
            title: 'Documented',
            description: `
                Reading documentation doesn't have to be a bother. We provide rich documentation with many examples,
                guides and tips & tricks. If you have issues getting something to work, the community will be right by your
                side and help you out.
            `,
        },
        {
            icon: faHeart,
            title: 'Free',
            description: `
                We ❤️ the open source community, so there are no strings attached. ngqp is free, open source and MIT-licensed.
                Find the source code on Github, fork it, or help improving it by contributing documentation, bug fixes or features.
            `,
        },
    ];

    public paramGroup: QueryParamGroup;

    constructor(qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            text: qpb.stringParam('q'),
            choice: qpb.stringParam('fruit'),
        });
    }

}
