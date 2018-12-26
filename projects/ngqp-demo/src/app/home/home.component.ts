import { Component } from '@angular/core';
import { IconDefinition, faGlassCheers, faCogs, faHeart, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

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

    public benefits: BenefitItem[] = [
        {
            icon: faGlassCheers,
            title: 'Simple',
            description: `
                We know that you expect things to just work. That's why ngqp requires almost no setup and is easy to use while
                giving you the flexibility to configure it to your needs. The API feels familiar because it is designed after
                the Forms API.
            `,
        },
        {
            icon: faCogs,
            title: 'Powerful',
            description: `
                Dependencies should earn their keep; that's why ngqp ships with a lot of features packed into an intuitive API
                that allow you to do exactly what you need to do.
            `,
        },
        {
            icon: faAlignLeft,
            title: 'Documented',
            description: `
                No one should have a hard time learning how to use something. We provide rich documentation with many examples,
                guides and tips & tricks. If you have any issue getting something to work, the community will be right by your
                side and help you out.
            `,
        },
        {
            icon: faHeart,
            title: 'Free',
            description: `
                We ❤️ the open-source community, so there are no hidden fees or strings attached. ngqp is free, open-source and
                MIT-licensed. Find the source code on Github, fork it, or help improving it by contributing documentation,
                bug fixes or features.
            `,
        },
    ];

}
