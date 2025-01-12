const locale = require('../utils/Localization');
const { ErrorMessage, SuccessMessage } = require('../utils/Messages');
const Mustache = require('mustache');
module.exports = {
    name: 'kick',
    description: 'command_kick',
    pattern: 'user:required',
    category: 'moderation',
    spread: true,
    execute(client, message, args, data) {
        // Check author has "ban" permission
        const permission = 'Kick';

        if (message.member.hasPermission('KICK_MEMBERS')) {
            if (message.mentions.members.first()) {
                message.mentions.members
                    .first()
                    .kick()
                    .then((member) => {
                        //console.log(mentionUser);
                        SuccessMessage(
                            message,
                            Mustache.render(
                                locale(data.language, 'successfully_kicked'),
                                { user: member.displayName }
                            ),
                            []
                        );
                    })
                    .catch((error) => {
                        ErrorMessage(
                            message,
                            Mustache.render(
                                locale(data.language, 'failed_to'),
                                { what: 'kick' }
                            ),
                            []
                        );
                    });
            } else {
                ErrorMessage(
                    message,
                    locale(data.language, 'need_mention_user'),
                    []
                );
            }
        } else {
            ErrorMessage(
                message,
                Mustache(locale(data.language, 'permission_required'), {
                    permission: permission,
                }),
                []
            );
        }
    },
};
