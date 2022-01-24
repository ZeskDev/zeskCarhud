SendNotification = function(txt)

end
local focus = false;
NuiFocus = function()
    SetNuiFocus(not focus, not focus)
end
openEditorMenu = function()
    if (IsPedInAnyVehicle(PlayerPedId())) then
        NuiFocus()
        SendNUIMessage({
            show = "editor";
        })
    else
        SendNotification("Necesitas estar en un coche para utilizar este comando!")
    end
end

RegisterNUICallback('exit', function(data)
    SendNotification("Has cerrado el panel de edición")
end)
RegisterCommand("ceditor", function(source, args)
    openEditorMenu()
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(50)
        if (IsPedInAnyVehicle(PlayerPedId())) then
            local vehicle = GetVehiclePedIsUsing(PlayerPedId());
            local velo = (GetEntitySpeed(vehicle) * 3.6);
            local fuel = GetVehicleFuelLevel(vehicle);
            local car = IsPedSittingInAnyVehicle(PlayerPedId());

            Citizen.Wait(20);

            SendNUIMessage({
                coche = car;
                vel = velo;
                fue = fuel;
            });
        else
            SendNUIMessage({
                coche = false;
            })
        end
    end
end)