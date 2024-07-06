@echo off
chcp 65001 > nul

cd /d %~dp0

:: Предложение ввести сообщение для коммита
set /p commitMsg="Введите сообщение для коммита: "

:: Выполнение команд git
git add *
git commit -m "%commitMsg%"
git push origin main
pause
