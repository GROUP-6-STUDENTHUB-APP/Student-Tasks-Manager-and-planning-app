import tkinter as tk
from tkinter import *
from tkinter import PhotoImage

#Dictionnaire  de couleur
couleur={"nero":"#252726",
         "purple":"#800080",
         "white":"#FFFFFF"}

#Parametrage  de la  fenetre
app=tk.Tk()
app.title("StudentHub APP")
app.config(bg="gray30")
app.geometry("400x600")
app.iconbitmap("logo.ico")

#parametrage switch
btnEtat = False

#Chargement Image Navbar
navIcon=PhotoImage(file='menu.png')
closeIcon=PhotoImage(file='close.png')
imgFond=PhotoImage(file='background1.png')

#Definir les fonctions switch
def switch():
    global btnEtat
    if btnEtat is True:
        #Créer une fermeture animée Navbar
        for x in range(300):
            navLateral.place(x=x,y=0)
            topFrame.update()
        #Reset couleur widgets
        bannerTexte.config(fg="purple")
        accueilText.config(bg=couleur["purple"])
        topFrame.config(bg=couleur["purple"])
        app.config(bg="gray30")
        btnEtat=False

    else:
        for x in range(-300,0):
                       navLateral.place(x=x,y=0)
                       topFrame.update()
                       btnEtat=True




#top bar ou Nav top:
topFrame=tk.Frame(app, bg=couleur["purple"])
topFrame.pack(side="top",fill=tk.X)

#Texte  de  top  bar
accueilText = tk.Label(topFrame, text="STUDENTHUB", font="ExtraCondensed 15",
                       bg=couleur["purple"],
                       fg="white",height=2,padx=20)
accueilText.pack(side="right")
  
#Banner Text & Image de font
can= Canvas(app, width=400,height=600)
can.create_image(0,0,anchor=NW,
                 image=imgFond)
bannerTexte = tk.Label(app,text="WEB DEVELOPMENT",
                       font="Extracondensed 25",
                       fg="purple")
bannerTexte.place(x=50,y=400)

can.pack()

#Navbar Icone
navbarBtn=tk.Button(topFrame,image=navIcon,
                    bg=couleur["purple"],bd=0,padx=20,
                    activebackground=couleur["purple"],
                    command=switch)
navbarBtn.place(x=10,y=10)

#Paramètres Navbar latérale
navLateral=tk.Frame(app,bg="gray30", width=300, height=600)
navLateral.place(x=-300, y=0)
tk.Label(navLateral, font="Extracondensed 15",bg=couleur["purple"],
         fg="black",width=300,height=2,padx=20).place(x=0,y=0)

y=80

#Les options dans la Navbar Laterale
option=["ADD A TASK","VIEW TASKS","EDIT TASKS","DELETE TASKS","HELP"]

#Positionnement  des options  dans la Navbar
for i in range(5):

    tk.Button(navLateral, text=option[i],  font="Extracondensed 15",bg="gray30",
              fg=couleur["white"],activebackground="gray30",bd=0).place(x=25,y=y)
    y+=40

#Parametrage bouton fermeture menu:
fermeBtn=tk.Button(navLateral,image=closeIcon,bg=couleur["purple"],
                   activebackground=couleur["purple"],bd=0,command=switch)
fermeBtn.place(x=250,y=10)

app.mainloop()