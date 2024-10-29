- разместите игроков на сетке (случайное положение для обоих игроков)
- остановить игру после того, как Google наберет необходимые очки
- Google должен перейти на пустую ячейку (если игрок находится в ячейке - перейти на другую ячейку)
- Создание классов:
- - Position (информационный эксперт\создатель  (GRASP))
- - Google (информационный эксперт\создатель (GRASP))
- - Settings (DI/инфраструктурный)
- - GridSettings (DI)
- - JumpSettings
- - Player (like Google)
- - Unit: Player extends Unit, Google extends Unit


// backward compatibility

// new Game(new Settings(new GridSettings()))


// entity objects vs value objects (DDD)