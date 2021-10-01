import ModuleService from 'services/api/ModuleService';

const moduleService = new ModuleService()

export const findModule = (id) => async dispatch => {
    const res = await moduleService.findModule(id);
    return res && res.data || [];
}

export const listModules = () => async dispatch => {
    const res = await moduleService.listModules();
    return res && res.data || [];
}
