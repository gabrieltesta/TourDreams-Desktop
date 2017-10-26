const {app, BrowserWindow, Menu} = require('electron');

//Criação da janela inicial
let window;
function createMainWindow(){
    window = new BrowserWindow({
        height: 800,
        width: 1200,
        frame: false,
        resizable: false,
        minWidth: 1200,
        minHeight: 800,
        show: false,
        backgroundColor: '#031634'
    });
    window.loadURL('file://' + __dirname + '/login.html');

    //Apresenta a janela apenas após seu carregamento
    window.on('ready-to-show', () => {
        window.show();
        window.maximize();
    });
}

//Função cria menu padrão da aplicação para funcionamento similar em todo
//sistema operacional
function createMainMenu(){
    const template = [
      {
        label: 'Edit',
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'pasteandmatchstyle'},
          {role: 'delete'},
          {role: 'selectall'}
        ]
      },
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {
        role: 'window',
        submenu: [
          {role: 'minimize'},
          {role: 'close'}
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click () { require('electron').shell.openExternal('https://electron.atom.io') }
          }
        ]
      }
    ]
    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          {role: 'about'},
          {type: 'separator'},
          {role: 'services', submenu: []},
          {type: 'separator'},
          {role: 'hide'},
          {role: 'hideothers'},
          {role: 'unhide'},
          {type: 'separator'},
          {role: 'quit'}
        ]
      })

      // Edit menu
      template[1].submenu.push(
        {type: 'separator'},
        {
          label: 'Speech',
          submenu: [
            {role: 'startspeaking'},
            {role: 'stopspeaking'}
          ]
        }
      )

      // Window menu
      template[3].submenu = [
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'}
      ]
    }
        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}


//Função cria o menu e a janela principal quando a aplicação está pronta
app.on('ready', () => {
    createMainMenu();
    createMainWindow();
});

//Função cria apenas a janela principal caso a aplicação esteja ativa mas sem
//janelas ativas(para sistemas darwin)
app.on('activate', () =>{
    if (!window){
        createMainWindow();
    }
});

//Caso todas as janelas estejam fechadas, desliga a aplicação (exceto sistemas
//darwin)
app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin'){
        app.quit();
    }
});
