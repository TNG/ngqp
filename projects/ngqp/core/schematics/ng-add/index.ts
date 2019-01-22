import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
    addModuleImportToRootModule,
    addPackageJsonDependency,
    getProjectFromWorkspace,
    getWorkspace,
    NodeDependencyType
} from 'schematics-utilities';

const NGQP_MODULE_NAME = 'QueryParamModule';

function getAngularVersion(): [number, number] | null {
    try {
        const version = '' + require('@angular/core/package.json').version;
        const [major, minor] = version.split(/\./);
        return isNaN(+major) || isNaN(+minor) ? null : [+major, +minor];
    } catch (err) {
        return null;
    }
}

function getMatchingVersion(angularVersion: [number, number], context: SchematicContext): number | null {
    if (angularVersion[0] <= 6) {
        context.logger.warn(`You're using Angular 6 or earlier, but ngqp has been developed for Angular 7+.`);
        return null;
    }

    if (angularVersion[0] === 7 && angularVersion[1] < 2) {
        context.logger.warn(`For Angular 7, at least version 7.2.0 is required.`);
        return null;
    }

    switch (angularVersion[0]) {
        case 7:
            return 0;
        default:
            return null;
    }
}

function addMatchingVersion(): Rule {
    return (host: Tree, context: SchematicContext) => {
        const angularVersion = getAngularVersion();
        if (angularVersion === null) {
            context.logger.warn(`Could not determine version of @angular/core, proceeding without setting the version.`);
            return host;
        }

        const matchingVersion = getMatchingVersion(angularVersion, context);
        if (matchingVersion === null) {
            context.logger.warn(`Found unsupported @angular/core major version ${angularVersion}, proceeding without setting the version.`);
            return host;
        }

        context.logger.info(`Determined @angular/core major version ${angularVersion}, installing @ngqp/core major version ${matchingVersion}.`);
        addPackageJsonDependency(host, {
            name: '@ngqp/core',
            type: NodeDependencyType.Default,
            version: `^${matchingVersion}.0.0`,
            overwrite: true,
        });

        context.addTask(new NodePackageInstallTask({ packageName: '@ngqp/core' }));
        return host;
    };
}

function addModuleToImports(options: any): Rule {
    return (host: Tree, context: SchematicContext) => {
        const workspace = getWorkspace(host);
        const project = getProjectFromWorkspace(
            workspace,
            options.project ? options.project : Object.keys(workspace[ 'projects' ])[ 0 ]
        );

        addModuleImportToRootModule(host, NGQP_MODULE_NAME, '@ngqp/core', project);
        context.logger.log('info', `✅️ "${NGQP_MODULE_NAME}" has been imported`);

        return host;
    };
}

export default function(options: any): Rule {
    return chain([
        addMatchingVersion(),
        options && options.skipModuleImport ? noop() : addModuleToImports(options),
    ]);
}