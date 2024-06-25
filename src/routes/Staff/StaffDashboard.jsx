
import {
    Coins,
      DollarSign,
      Home,
      LogOut,
      Menu,
      MessageCircle,
      Target,
      UserRoundCog,
      UserRoundPlus,
    } from "lucide-react"
    
    
    import { Button } from "@/components/ui/button"
    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card"
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
    
    import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
    import { Link, NavLink, Outlet } from "react-router-dom"
    import useAuth from "@/hooks/useAuth"
  
  import { ModeToggle } from "@/components/app_components/common/ToggleTheme"
  import Loading from "@/components/app_components/common/Loading"
  import AccessWindow from "@/components/app_components/common/AccessWindow"
  import { useEffect, useState } from "react"
  import useAxiosSecure from "@/hooks/useAxiosSecure"
    
    const StaffDashboard = () => {
        const {user, logOut } = useAuth()
        // const {admin}  = useAdminByEmail(user?.email)
        const [admin, setAdmin] = useState({})
        const axiosSecure = useAxiosSecure()
  
        useEffect(() => {
          const getAdmin = async () => {
            try {
              const res = await axiosSecure.get(`/admins/${user?.email}`);
              setAdmin(res.data);
            } catch (error) {
              console.error(error);
            }
          };
  
          getAdmin();
        }, [user?.email, axiosSecure])
    
    
        const handleLogOut = () => {
            logOut()
              .then()
              .catch((error) => console.log(error));
          };
  
    
      return (
        <>{ admin.admin ? 
          <> { admin.admin.role === "staff" ? 
        <div className="grid  h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link to="/" className="flex items-center gap-2 font-semibold grayscale hover:grayscale-0">
                  <img className="h-6 w-6" src="https://i.postimg.cc/XYSGZD9T/logo.png" alt="logo"/>
                  <span className="">Amar Bill from Spacesoft</span>
                </Link>
              </div>
              <div className="flex-1 dashboard">
                <nav className="grid Nav items-start px-2 text-sm font-medium lg:px-4">
                  <NavLink
                    to="dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </NavLink>
  
                  <NavLink
                    to="add-user"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                  >
                    <UserRoundPlus className="h-4 w-4" />
                    Add User
                  </NavLink>
                </nav>
              </div>
             
            </div>
          </div>
          <div className="flex flex-col ">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/* Sheet */}
              <Sheet className="">
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="dashboard flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link
                      href=""
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                       <img className="h-6" src="https://i.postimg.cc/XYSGZD9T/logo.png"/>
                      <span className="">Staff Dashboard</span>
                    </Link>
                    <NavLink
                    to="dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="manage-user"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                  >
                    <UserRoundCog className="h-4 w-4" />
                    Manage User
                  </NavLink>
                  <NavLink
                    to="manage-contest"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                  >
                    <Target className="h-4 w-4" />
                    Manage Contests
                  </NavLink>
                  </nav>
                  <div className="mt-auto">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>
                          Unlock all features and get unlimited access to our
                          support team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button size="sm" className="w-full">
                          Upgrade
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </SheetContent>
              </Sheet>
    
              <div className="w-full flex-1">
                <div className="font-bold">Staff Dashboard</div>
              </div>
              <div className="w-full flex-1"></div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <UserRoundCog/>
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Staff</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogOut}><LogOut className="mr-2" size={16}/> Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModeToggle/>
    
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              <Outlet/>
            </main>
          </div>
        </div> : <AccessWindow type="You are not the Admin!" role={admin.admin.role}/>
                }
          </>
          : <Loading/>
          }</>
      )
    }
    
    
export default StaffDashboard;