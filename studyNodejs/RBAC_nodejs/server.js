import app from './src/app.js';
import environmentConfig from './src/configs/environment.config.js';
const {
    appConfig: { host, port },
} = environmentConfig;

const server = app.listen(port, () => {
    console.log(`
.                                                                                                  .
.                                                                                                  .
.                                                                                                  .
.                                                                                                  .
.                                    :;::::::::::::::::::::::::;;.                                 .
.                                    :::                   ..;++::                                 .
.                                    :::                   .++++::                                 .
.                                    :::                 .;+++++::                                 .
.                                    :::               ..+++++++::                                 .
.                                    :::               :++++++++::                                 .
.                                    :::             .;+++++++++::                                 .
.                                    :::            .+++++++++++::                                 .
.                                    ::+;;;;;;;;;;;;++++++++++++:.                                 .
.                                    .;;;;;;;;;;;;  .;;;;;;;;;;;:.                                 .
.                                            .:::;  .;::.                                          .
.                                           .+:.........;:                                         .
.                                                                                                  .
.                                                                                                  .
.      .++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++;    .
.                                                                                                  .
.                                                                                                  .
.        .;+++++;.  .++.   .:+;. .:++++.      :+;    .++.                 ..  .::.                 .
.         .+;. :+;  :++:  .:++. .;+. :+:     .++;.  .++;.                .++. :+;.                 .
.        .:+:. :+: .+++: .;++;. :+.  .+:.    :+++. .+++. ..::.  .:. ..:. .:..:;+:...::.  .:..:.    .
.        .++..:+;. :+;+:.;+;+.  ;+;.        .++++.:+;+; .++:++. :+::+++. ;+..:+;:.++:++. :+;+:.    .
.        .++;+++. .;+:+;++:+;.  ..;++;.    .:+:;+:+:;+..++..;+..+;;+.+; .+; .;+..++..;+..+++:      .
.        ++.  :+: .+;.++;.;+:  .   .++.    .;+.;++..+;.:+: .;+.:+++.:+..;+. .+;.:+: .;+.;+...      .
.       :+:  .++..++..;:..++. :+. .:+;.    .+: :;..;+: ;+. :+:.++;..+; .+;..;+. ;+. :+:.+;.        .
.      .;+:.;++. :+;     :+.  :+;.:+;.    .++.    .++. ;+:;+: :+;..;+. ;+. .+;  ;+:;+: :+:         .
.      .::::...  .:.     .:.  ..;;:.      .:.     .:.  .:;:.. ... .:.. :.  .:.  .:;:.. .:.         .
.                                                                                                  .
.                                                                                                  .
.                                                                                                  .
.                                                                                                  .
.                                                                                                  .
################################################
🛡️  Server listening on:: ${host}:${port} 🛡️
################################################      
`);
});

export default server;
