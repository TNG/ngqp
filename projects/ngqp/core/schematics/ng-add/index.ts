import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addModuleImportToRootModule, getProjectFromWorkspace, getWorkspace } from 'schematics-utilities';

const NGQP_MODULE_NAME = 'QueryParamModule';

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
        options && options.skipModuleImport ? noop() : addModuleToImports(options),
    ]);
}