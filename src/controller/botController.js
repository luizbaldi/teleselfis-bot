/* Internal modules */
const { getWeeklyPostsLength, getTopThreeRank, hasToSendMessage, SHOW_MESSAGES } = require('../helper/util')
const { getInitialData, updateFirebaseUser } = require('../service/userService')
const { users, setUsers } = require('../helper/userStore')
const pkg = require('../../package.json')

const startBotListeners = (bot) => {
  console.log('Starting bot event listeners...')

  getInitialData().then(data => {
    setUsers(data)
    console.log('users', users)

    bot.on('text', message => {
      _onText(bot, message)
    })

    bot.on('photo', message => {
      _onNewPhoto(bot, message)
    })
  })
}

const handleCommands = (bot, groupId, text, user) => {
  switch (text) {
    case '/comandos':
      bot.sendMessage(groupId, `Comandos disponíveis: /semana, /total, /top3`)
      break
    case '/semana':
      bot.sendMessage(groupId, `${user.name}, seus pontos da semana são: ${getWeeklyPostsLength(user)}`)
      break
    case '/total':
      bot.sendMessage(groupId, `${user.name}, seus pontos totais são: ${Object.keys(user.posts).length}`)
      break
    case '/ferd':
      bot.sendMessage(groupId, `Esse comando é uma menção honrosa ao mano ferd que foi o cobaia oficial enquanto eu nascia.`)
      break
    case '/top3':
      bot.sendMessage(groupId, `Os top 3 membros do grupo das teleselfies são: ${getTopThreeRank(users)}`)
      break
    case '/versao':
      bot.sendMessage(groupId, `Versão ${pkg.version}`)
      break
    default:
      bot.sendMessage(groupId, `Infelizmente eu não to ligado nesse comando que voce digitou :(`)
      break
  }
}

const handleMessages = (bot, groupId, text) => {
  if (hasToSendMessage()) {
    if (text.match('maconha')) {
      bot.sendMessage(groupId, `Maconha? Tô fora, pego meus circuitos e vou embora!`)
    } else if (text.match('cremos')) {
      bot.sendMessage(groupId, `Atingir o mais alto nível de cremosidade é um dos sentidos da vida.`)
    } else if (text.match('tabaco')) {
      bot.sendMessage(groupId, `Tabaco? Tabaco tô dentro, pego meu borão virtual e acendo`)
    }
  }
}

const _onNewPhoto = (bot, message) => {
  const groupId = message.chat.id
  const currentUser = global.users[message.from.id]
  const photoId = message.photo.shift().file_id
  const currentPhoto = {
    date: new Date()
  }

  currentUser.posts[photoId] = currentPhoto
  updateFirebaseUser(currentUser)
  if (SHOW_MESSAGES) {
    let customMessage
    customMessage = `${currentUser.name}, sua imagem foi computada com sucesso :)`
    bot.sendMessage(groupId, customMessage)
  }
}

const _onText = (bot, { text, from, chat }) => {
  const groupId = chat.id
  if (text.startsWith('/')) {
    const user = global.users[from.id]

    if (text === '/cadastro') {
      if (!user) {
        handleNewUser(bot, groupId, from.id, from.first_name)
      } else {
        bot.sendMessage(groupId, 'Ops, parece que você já está cadastrado no meu banco de dados')
      }
    } else if (user) {
      handleCommands(bot, groupId, text, user)
    } else {
      bot.sendMessage(groupId, 'Você precisa estar cadastrado para ter acesso aos comandos, digite /cadastro e seja feliz :)')
    }
  } else {
    handleMessages(bot, groupId, text)
  }
}

const handleNewUser = (bot, groupId, userId, firstName) => {
  const newUser = {
    id: userId,
    name: firstName,
    posts: {}
  }
  updateFirebaseUser(newUser)
  bot.sendMessage(groupId, `Nosso querido(a) ${newUser.name} agora faz parte do bonde :)`)
}

module.exports = { startBotListeners }
