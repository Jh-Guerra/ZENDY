import defaultAvatarMale from 'assets/images/defaultAvatarMale.jpg'
import defaultAvatarFemale from 'assets/images/defaultAvatarFemale.jpg'
import defaultAvatarCompany from 'assets/images/defaultCompany.png'
import config from 'config/Config'

export const setImageProfile = (type, receiver) => {

    if (type != null) {
        switch (type) {
            case 'Cliente':
                if(receiver == null) return defaultAvatarMale
                break;
            case 'Empresa':
                if(receiver == null) return defaultAvatarCompany
                break;
            default:
                return ''
        }
    }


    // para retornar imagen de perfil de usuarios en chat
    const sex = receiver.sex

    const image = receiver.avatar

    if(sex != null) {

        if(image == null) {
            switch (sex) {
                case 'masculino':
                    return defaultAvatarMale
                case 'femenino' :
                    return defaultAvatarFemale
                default:
                    return defaultAvatarMale;
            }
        }

        return config.api+image
    }

    const profileImageEnterprise = image

    if(profileImageEnterprise == null) return defaultAvatarCompany

    return config.api+image
}
