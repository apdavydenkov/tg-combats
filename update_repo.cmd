@echo off
chcp 65001 > nul

cd /d %~dp0

:: Предложение ввести сообщение для коммита
set /p commitMsg="Введите сообщение для коммита: "

:: Проверка, пустое ли сообщение
if "%commitMsg%"=="" (
    :: Если пустое, используем стандартное сообщение с датой и временем
    set commitMsg=Автоматический коммит %date% %time%
)

:: Выполнение команд git
git add *
git commit -m "%commitMsg%"
git push origin main
pause
